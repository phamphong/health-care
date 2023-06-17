import React, { useCallback } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSession, signOut } from "next-auth/react"
import { HeaderMenu, HeaderMenuItem } from './header-menu';
import Link from 'next/link';

import IconChallenge from '../../image/icon_challenge.png';
import IconInfo from '../../image/icon_info.png';
import IconMemo from '../../image/icon_memo.png';
import IconMenu from '../../image/icon_menu.png';
import IconClose from '../../image/icon_close.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorMenu);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (session) {
      setAnchorEl(event.currentTarget);
    } else {
      router.push("/login")
    }
  }, [session]);

  const handleShowMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  }, []);
  const handleHideMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(null);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [session]);

  const handleOnLogout = async () => {
    signOut({ redirect: false, callbackUrl: "/" });
  }

  return (
    <div className='mb-16' >
      <nav className="bg-dark-500 text-light fixed w-full z-20 top-0 left-0 border-b border-gray-20">
        <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto px-4 py-0">
          <div className='flex gap-4'>
            <Link href={"/"}>
              <img src="/logo.svg" width={144} height={64} alt="logo" />
            </Link>
          </div>
          <div>
            <HeaderMenu>
              <Link href={'/my-record'}>
                <HeaderMenuItem icon={<Image {...IconMemo} width={32} height={32} alt="自分の記録" />}>自分の記録</HeaderMenuItem>
              </Link>
              <HeaderMenuItem icon={<Image {...IconChallenge} width={32} height={32} alt="チャレンジ" />}>チャレンジ</HeaderMenuItem>
              <HeaderMenuItem icon={<Image {...IconInfo} width={32} height={32} alt="お知らせ" />} notiCount={1} >お知らせ</HeaderMenuItem>
              <div className="flex gap-4" >
                <button aria-label="user" className='w-8 h-8 rounded-2xl hover:bg-gray-100 cursor-pointer'
                  onClick={handleClick}
                >
                  <AccountCircleIcon className='text-black dark:text-white' />
                </button>
                <button aria-label="user" className='w-8 h-8'
                  onClick={handleShowMenu}
                >
                  {openMenu ?
                    <Image {...IconClose} alt="close" width={32} height={32} />
                    :
                    <Image {...IconMenu} alt="menu" width={32} height={32} />
                  }
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  classes={{
                    list: 'gray-color py-0',
                    paper: 'bg-gray-color rounded-none py-0',
                  }}
                >
                  <MenuItem className='bg-gray-color text-light px-6 py-5 text-lg' onClick={handleOnLogout}>
                    Logout
                  </MenuItem>
                </Menu>
                <Menu
                  anchorEl={anchorMenu}
                  open={openMenu}
                  onClose={handleHideMenu}
                  onClick={handleHideMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  classes={{
                    list: 'gray-color py-0',
                    paper: 'bg-gray-color rounded-none py-0',
                  }}
                >
                  <MenuItem className='bg-gray-color text-light px-6 py-5 text-lg w-72 ' >
                    自分の記録
                  </MenuItem>
                  <MenuItem className='bg-gray-color text-light px-6 py-5 text-lg w-72 ' >
                    体重グラフ
                  </MenuItem>
                  <MenuItem className='bg-gray-color text-light px-6 py-5 text-lg w-72 ' >
                    目標
                  </MenuItem>
                  <MenuItem className='bg-gray-color text-light px-6 py-5 text-lg w-72 ' >
                    選択中のコース
                  </MenuItem>
                  <Link href={"/column"}>
                    <MenuItem className='bg-gray-color text-light px-6 py-5 text-lg w-72 ' >
                      コラム一覧
                    </MenuItem>
                  </Link>
                  <MenuItem className='bg-gray-color text-light px-6 py-5 text-lg w-72 ' >
                    設定
                  </MenuItem>
                </Menu>
              </div>
            </HeaderMenu>
          </div>
        </div>
      </nav>
    </div>
  )
}
