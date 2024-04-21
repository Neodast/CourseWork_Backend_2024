import { Card } from 'antd';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  return (
    <>
      <Card className='rounded-xl w-auto max-w-[200rem] mb-6 mr-64 ml-40 transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:cursor-pointer font-nimbus'>
        {props.children}
      </Card>
    </>
  );
}