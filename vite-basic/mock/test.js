export default [
  {
    url: '/api/users',
    methodL: 'GET',
    response: (query) => {
      return {
        code: 0,
        data: [
          {
            id: 1,
            username: '杰克'
          },
          {
            id: 2,
            username: '玛丽'
          }
        ]
      }
    }
  }
]
