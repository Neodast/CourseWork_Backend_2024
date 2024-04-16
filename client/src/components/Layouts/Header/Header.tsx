import HeaderLeftPanel from './HeaderLeftPanel';
import HeaderRightPanel from './HeaderRightPanel';
import { memo } from 'react';

const Header = memo(() => {
  return (
    <>
      <header className="box-border overflow-hidden h-14 bg-blue-400 flex flex-row justify-between flex-wrap sticky top-0 z-50 shadow-2xl">
        <HeaderLeftPanel />
        <HeaderRightPanel />
      </header>
    </>
  );
});

export default Header;
