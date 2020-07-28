const fs = require('fs');

const User = require('./models/User')
const Post = require('./models/Post')
const truncate = require('../utils/truncate')
const Time = require('../utils/time')

require('./connection')


async function exec() {
  await truncate('posts')
  await truncate('users')

  if(!fs.existsSync(`${__dirname}/../../objection.json`)){
    fs.writeFileSync(`${__dirname}/../../objection.json`, JSON.stringify([]))
  }

  const objectionData = require('../../objection.json')

  const time = new Time();

  time.init('create:users')
  const user = await User.query().insert({
    first_name: 'Jardel',
    last_name: 'Gonçalves'
  })
  const timeCreateUsers = time.finished('create:users')

  time.init('create:posts')
  await Post.query().insert({
    user_id: user.id,
    title: 'Test Title',
    description: 'Test Description',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula egestas libero a semper. Etiam rutrum, quam ac suscipit ullamcorper, est diam lacinia ex, vel dictum diam mi ac mauris. Nullam diam lectus, euismod in mattis ut, aliquet sed arcu. Phasellus luctus aliquet magna, id faucibus ex condimentum ac. Ut eu odio non ligula varius ultricies et et diam. Nulla facilisi. Praesent ut dui et ligula pharetra bibendum id a velit. Ut lacinia, odio quis finibus congue, nisi odio finibus orci, aliquam suscipit orci dolor finibus lacus. Donec facilisis, sem vitae pretium lacinia, neque eros interdum tortor, non feugiat leo erat vitae diam. Nulla dignissim pharetra justo ac condimentum. Pellentesque semper, lacus sit amet porta facilisis, ligula mauris dictum libero, placerat rhoncus diam tortor id lectus. Donec id efficitur diam. Proin semper ipsum sit amet metus elementum, a volutpat lacus pulvinar. Etiam eleifend egestas tellus eget placerat. Nam dictum leo eget sem tincidunt hendrerit. Nullam vitae nisi a enim vulputate vulputate ac id felis.'
  })
  const timeCreatePosts = time.finished('create:posts')

  time.init('select:users')
  await User.query();
  const timeSelectUsers = time.finished('select:users')

  time.init('select:posts')
  await Post.query();
  const timeSelectPosts = time.finished('select:posts')

  time.init('select:loadPosts')
  const data = await User.query().where({ id: user.id }).withGraphFetched('posts');
  const timeLoadPostsUser = time.finished('select:loadPosts')

  const dataUpdated = [
    ...objectionData,
    {
      create_user: timeCreateUsers,
      create_post: timeCreatePosts,
      select_users: timeSelectUsers,
      select_post: timeSelectPosts,
      select_load_posts_users: timeLoadPostsUser,
    },
  ]

  fs.writeFileSync(`${__dirname}/../../objection.json`, JSON.stringify(dataUpdated))

  process.exit()
}

exec()