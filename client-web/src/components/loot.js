import React from 'react';

var Loot;
export default Loot = (props) => (
  <div className='lootList'>
    <div className='lootItem'>
      <image className='lootBullet' />
      <span>1</span>
    </div>

    <div className='lootItem'>
      <image className='lootBanana' />
      <span>1</span>
    </div>

    <div className='lootItem'>
      <image className='lootShield' />
      <span>0</span>
    </div>
  </div>
);