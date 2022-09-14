const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
  import('./video').then((ret) => {
    console.log('ret >>> ', ret)
  })
})
