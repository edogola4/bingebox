/*import React, { useState } from 'react';
import ProfilePicker from './components/ProfilePicker/ProfilePicker';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (image) => {
    console.log('Selected Image:', image);
    setSelectedImage(image);
  };

  return (
    <div>
      <button onClick={() => setDrawerOpen(true)}>Choose Profile Picture</button>
      <ProfilePicker
        open={drawerOpen}
        handleImageChange={handleImageChange}
        setOpen={setDrawerOpen}
      />
      {selectedImage && (
        <div>
          <h3>Selected Profile Picture:</h3>
          <img src={selectedImage} alt="Selected Profile" />
        </div>
      )}
    </div>
  );
};

export default App;
*/


import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';

import { profPic } from '../../image';
import './profilePicker.styles.scss';

const ProfilePicker = ({open, handleImageChange, setOpen}) => {
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpen(open);
    };
    
    return (
        <SwipeableDrawer anchor='right' open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            <div onClick={toggleDrawer(false)} className='prof__pic--svg'>
                <FirstPageRoundedIcon />
            </div>
            <div className='prof__pic'>
                {profPic.map((pic) => (
                    <div className='prof__pic--img' onClick={() => handleImageChange(pic.img)}>
                        <img src={pic.img} />
                    </div>
                ))}
            </div>
        </SwipeableDrawer>
    )
}

export default ProfilePicker;