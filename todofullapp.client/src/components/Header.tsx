import { useAuth } from '@/hooks/useAuth'
import { SVGProps } from 'react'
import '@/styles/Header.css'

interface Props {
  username?: string
}

export const Header = ({ username = 'Jon' }: Props) => {
  const { logout } = useAuth()
  return (
    <header className='header flex justify-between items-center py-4 px-10 bg-gray-800 text-white sticky top-0 z-10'>
      <h1 className='text-2xl'>TodoFullApp</h1>
      <div className='dropdown flex justify-end gap-2 relative cursor-pointer'>
        <h5 className='text-lg'>{username}</h5>
        <PhUserCircle className='w-8 h-8' />
        <span className='dropdown-content flex flex-col items-end bg-gray-700 rounded-md'>
          <button className='py-2  hover:bg-gray-600 rounded-md transition-all w-full'>
            Edit profile
          </button>
          <button
            className='py-2 hover:bg-gray-600 hover:text-red-600 rounded-md transition-all w-full'
            onClick={logout}
          >
            <LaPowerOff className='w-4 h-4 mr-1 inline align-baseline' />
            Logout
          </button>
        </span>
      </div>
    </header>
  )
}

export function PhUserCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 256 256'
      {...props}
    >
      <path
        fill='currentColor'
        d='M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24M74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0M96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32m97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0'
      />
    </svg>
  )
}

export function LaPowerOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 32 32'
      {...props}
    >
      <path
        fill='currentColor'
        d='M15 4v12h2V4zm-3 .688C7.348 6.34 4 10.785 4 16c0 6.617 5.383 12 12 12s12-5.383 12-12c0-5.215-3.348-9.66-8-11.313v2.157C23.527 8.39 26 11.91 26 16c0 5.516-4.484 10-10 10S6 21.516 6 16c0-4.09 2.473-7.61 6-9.156z'
      />
    </svg>
  )
}
