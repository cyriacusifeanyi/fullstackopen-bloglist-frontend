describe('5.17: bloglist end to end testing, step1', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#loginForm').exist
  })
})

describe('5.18: bloglist end to end testing, step2', function () {
  const newUser = {
    name: 'Thomas Aquinas',
    username: 'stThomas',
    password: '1991-1958'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    cy.request('POST', 'http://localhost:3001/api/users/', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginForm').exist
    // ...
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(newUser.username)
      cy.get('#password').type(newUser.password)
      cy.get('#login-button').click()

      cy.contains(newUser.name.concat(' logged-in'))

    })

    it('fails with wrong credentials', function () {
      // ...
      cy.get('#username').type('wrong crendential')
      cy.get('#password').type('wrong crendential')
      cy.get('#login-button').click()
      cy.get('h2').should('not.contain', newUser.name.concat(' logged-in'))

    })
  })
})

describe('5.19: bloglist end to end testing, step3', function () {
  // ...
  const newUser = {
    name: 'Thomas Aquinas',
    username: 'stThomas',
    password: '1991-1958'
  }

  const newBlog = {
    title: 'Mr. Turning',
    author: 'research@civm.com',
    url: 'https://civm.com'
  }

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      // create here a user to backend
      cy.request('POST', 'http://localhost:3001/api/users/', newUser)
      cy.visit('http://localhost:3000')

      // log in user here
      cy.get('#username').type(newUser.username)
      cy.get('#password').type(newUser.password)
      cy.get('#login-button').click()
      // confirm that user is added
      cy.contains(newUser.name.concat(' logged-in'))
    })

    it('A blog can be created', function () {
      // open form
      cy.get(':nth-child(1) > button').click()
      // fill form
      cy.get('#newBlogTitle').type(newBlog.title)
      cy.get('#newBlogAuthor').type(newBlog.author)
      cy.get('#newBlogUrl').type(newBlog.url)
      // click submit
      cy.get('#submitNewNote').click()

      cy.get('.blog').should('contain', newBlog.title)

    })
  })
})

describe('5.20: bloglist end to end testing, step4', function () {
  // Make a test which checks that user can like a blog.
  const newUser = {
    name: 'Thomas Aquinas',
    username: 'stThomas',
    password: '1991-1958'
  }

  const newBlog = {
    title: 'Mr. Turning',
    author: 'research@civm.com',
    url: 'https://civm.com'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create a user to backend
    cy.createUser({
      name: newUser.name,
      username: newUser.username,
      password: newUser.password
    })

    // log in user here
    cy.login({
      username: newUser.username,
      password: newUser.password
    })

    // create new blog
    cy.createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
  })

  it('passes if user can like a blog', function () {

    cy.contains('likes 0')
    // click (view) of one
    cy.get('.blog > div > :nth-child(1) > button').click()
    // click like
    cy.get('[style=""] > :nth-child(4)').click()
    cy.contains('likes 1')
  })

})

describe('5.21: bloglist end to end testing, step4', function () {
  // Make a test which checks that user can like a blog.
  const newUsers = [
    {
      name: 'Shalom Kingsley',
      username: 'amen',
      password: 'easy password',
      blogs: {
        title: 'Journey from Benin to Kaduna',
        author: 'amen@civm.com',
        url: 'https://civm.com'
      }
    }, {
      name: 'Doshima Oluchi',
      username: 'Dora',
      password: 'veryDifficult Password',
      blogs: {
        title: 'The Order of Food Commitees',
        author: 'dora@civm.com',
        url: 'https://civm.com'
      }
    }
  ]

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // create a 2 user and a blog for each
    newUsers.forEach(newUser => {
      // create a user
      cy.createUser({
        name: newUser.name,
        username: newUser.username,
        password: newUser.password
      })

      // log in user here
      cy.login({
        username: newUser.username,
        password: newUser.password
      })

      // create new blog
      cy.createBlog({
        title: newUser.blogs.title,
        author: newUser.blogs.author,
        url: newUser.blogs.url
      })
    })

    // verify that there 2 blogs
    cy.contains(newUsers[0].blogs.title)
    cy.contains(newUsers[1].blogs.title)

    // user[0] logs in for each of the test below
    cy.login({
      username: newUsers[0].username,
      password: newUsers[0].password
    })
  })

  it('passes if a user can delete his blog', function () {
    // click (view) of one
    cy.get('#blogLists >:nth-child(2) > div > :nth-child(1) > button').click()
    // click delete
    cy.get('#blogLists >:nth-child(2) > div > [style=""] > :nth-child(7)').click()

    cy.visit('http://localhost:3000')
    cy.get('#blogLists').should('not.contain', newUsers[0].blogs.title)
  })

  it('passes if user can\'t delete another users blog', function () {
    // click (view) of one
    cy.get('#blogLists >:nth-child(1) > div > :nth-child(1) > button').click()
    // click delete
    cy.get('#blogLists >:nth-child(1) > div > [style=""] > :nth-child(7)').click()

    cy.visit('http://localhost:3000')
    cy.get('#blogLists').should('not.contain', newUsers[1].blogs.title)
  })

})

describe('5.22: bloglist end to end testing, step6', function () {
  const newUser = {
    name: 'Shalom Kingsley',
    username: 'amen',
    password: 'easy password',
    blogs: [
      {
        title: 'Journey from Benin to Kaduna',
        author: 'amen@civm.com',
        url: 'https://civm.com',
        likes: 10
      }, {
        title: 'The Order of Food Commitees',
        author: 'dora@civm.com',
        url: 'https://civm.com',
        likes: 4
      }, {
        title: 'It\'s a wonderful life',
        author: 'george@civm.com',
        url: 'https://civm.com',
        likes: 8
      }
    ]
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // create a 2 user and a blog for each
    // create a user
    cy.createUser({
      name: newUser.name,
      username: newUser.username,
      password: newUser.password
    })

    // log in user here
    cy.login({
      username: newUser.username,
      password: newUser.password
    })

    // create and verify 3 new blog
    newUser.blogs.forEach(blog => {
      // create new blog
      cy.createBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      })
      // verify new blog
      cy.contains(blog.title)
    })
  })

  it('passes if the blogs are arranged by number of likes (in descending order)', function () {
    cy.request('GET', 'http://localhost:3001/api/blogs').then(response => {
      let index = 0
      response.body
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
        .map((blog) => {
          cy.get('#blogLists > :nth-child('.concat(++index, ')')).contains(blog.title)
        })
    })
  })
})