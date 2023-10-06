import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-col flex-center'>
      <h1 className='text-center head_text'>
        Collaborate & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>
          Your Notes with Ease
        </span>
      </h1>
      <p className='desc text-center'>
        The Ultimate Note Sharing App for All Your Needs. Whether You Want to
        Create Notes with Rich Media, Organize Them in Different Ways, Sync Them
        Across Devices, Collaborate with Others, or Share Them with the World,
        Note It Has You Covered.
      </p>
      <Feed />
    </section>
  )
}

export default Home
