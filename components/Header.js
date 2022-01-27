import { useEffect, useState } from 'react';
import Image from 'next/image';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Avatar } from '@mui/material';
import HeaderLink from './HeaderLink';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1d2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <>
            {resolvedTheme === 'dark' ? (
              <Image
                src="/linkedin-white.png"
                width={45}
                height={45}
                alt="logo"
              />
            ) : (
              <Image src="/linkedin.png" width={45} height={45} alt="logo" />
            )}
          </>
        )}
        <div className="flex  items-center space-x-1  dark:md:bg-gray-700 py-2.5 px-4 w-full rounded">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search ..."
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>
      {/* right */}
      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />
        {/* Dark Mode Toggle */}
        {mounted && (
          <div
            // flex-shrink-0 --> prevent from hidden
            className={`${
              resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'
            }
           bg-gray-600 flex items-center rounded-full px-0.5 h-6 w-12 cursor-pointer flex-shrink-0 relative`}
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            <span className="absolute left-0">🌜</span>

            {/* framer-motion */}
            {/* layout: boolean | "position" | "size". If true, this component
             will automatically animate to its new position when its layout changes. */}
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            />
            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// Stiffness of the spring. Higher values will create more sudden movement. Set to 100 by default.
// Damping Strength of opposing force. If set to 0, spring will oscillate indefinitely. Set to 10 by default.
const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};
