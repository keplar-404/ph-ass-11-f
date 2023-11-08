import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "../../lib/axios";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ disable, bookData, userData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(bookData);
  // console.log(userData);

  const retunRef = React.useRef(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = retunRef.current.value;
    // console.log(date)
    axios.post("/borrow", {
      id: bookData._id,
      personName: userData.email,
      personGmail: userData.email,
      returnDate: date,
    }).then((data)=>toast.success('You successfully borrowed this book')).catch(err=>console.log(err))
  };

  return (
    <div>
      <Button
        variant="contained"
        disabled={disable === true ? true : false}
        onClick={handleOpen}
      >
        Borrow
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <label htmlFor="date" className="font-bold">
              Return date:
            </label>
            <input type="date" id="date" ref={retunRef} />
            <br />
            <br />

            <Button
              variant="contained"
              onClick={(e) => {
                handleClose();
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
