import React from 'react';

var Loot;
export default Loot = ({loot}) => (
  <div className='lootList'>
    <div className='lootItem'>
      <image className='lootBullet' />
      <span>{ loot.ammo }</span>
    </div>

    <div className='lootItem'>
      <image className='lootBanana' />
      <span>{ loot.banana }</span>
    </div>

    <div className='lootItem'>
      <image className='lootShield' />
      <span>{ loot.shield }</span>
    </div>
  </div>
);