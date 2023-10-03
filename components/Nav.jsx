'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Image from 'next/image'

const Nav = () => {
  const isUserLoggedIn = true

  const [providers, setProviders] = useState(null)
  const [toggleProfile, setToggleProfile] = useState(false)
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setProviders()
  }, [])
  return (
    <nav className='w-full flex-between mb-16 pt-3'>
      <Link href='/' className='flex flex-center gap-2'>
        <Image
          src='/assets/images/logo.svg'
          alt='Noteify Logo'
          cLassName='object-contain'
          width={30}
          height={30}
        />
      </Link>

      {/* Mobile Navbar */}
      <div className='flex relative sm:hidden'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src='/assets/images/logo.svg'
              alt='Noteify Logo'
              cLassName='rounded-full'
              width={37}
              height={37}
              onClick={() => setToggleProfile((prev) => !prev)}
            />
            {toggleProfile && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleProfile(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create'
                  className='dropdown_link'
                  onClick={() => setToggleProfile(false)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleProfile(false)
                    signOut()
                  }}
                  className='black_btn w-full mt-5'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create' className='black_btn'>
              Create Note
            </Link>
            <button className='outline_btn' onClick={signOut}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src='/assets/images/logo.svg'
                alt='Noteify Logo'
                cLassName='rounded-full'
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
