const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')
const JWT_SECRET = process.env.JWT_SECRET
const pubSub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          filter = { author: author._id }
        }
      }
      if (args.genre) {
        filter = { ...filter, genres: { $in: [args.genre] } }
      }
      return Book.find(filter)
    },

    allAuthors: async () => {
      console.log('Author.find')
      return Author.find({}).populate('books')
    },
    me: (root, args, context) => context.currentUser,
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author._id)
      return {
        name: author.name,
        born: author.born,
        id: author.id,
        bookCount: author.bookCount,
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      /*
      console.log('Author.findById')
      const author = await Author.findById(root.id)
      console.log('Book.countDocuments')
      return Book.collection.countDocuments({ author: author._id })
      */
      return root.books.length
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({ ...args, author: author })
      try {
        book.save()
        pubSub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'defaultPassword') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
