exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, email: 'pietgeursen@gmail.com', name: 'Piet Geursen', image_link: 'http://thecatapi.com/?id=6fs', github_link: 'https://github.com/pietgeursen'})
      ])
    })
}
