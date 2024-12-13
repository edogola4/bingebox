import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

import './modal.styles.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Responsive width for smaller screens
  maxWidth: '400px', // Maximum width for larger screens
  bgcolor: '#1a1a1a', // Dark background for modern look
  border: '1px solid #6052ff',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
  p: 4,
  borderRadius: '12px',
  color: '#fff', // White text for readability
  overflowY: 'auto', // Scrollable content if needed
};

const BasicModal = ({ children, modal, setModal }) => {
  const handleClose = () => setModal(false);

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <button className="modal__close" onClick={handleClose}>
            <CloseIcon />
          </button>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
