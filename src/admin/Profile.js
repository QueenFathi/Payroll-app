import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import { auth, db, storage } from "../config/fireConfig";
import { useOutletContext } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

export default function Profile() {
  const { userData } = useOutletContext();
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);
  const [avatarChangeModal, setAvatarChangeModal] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");

  const handleAvatarChangeModalShow = () => setAvatarChangeModal(true);
  const handleAvatarChangeModalClose = () => setAvatarChangeModal(false);
  const handlePasswordChangeModalShow = () => setPasswordChangeModal(true);
  const handlepasswordChangeModalClose = () => setPasswordChangeModal(false);
  const handleStaffAvatar = async (avatar) => {
    await setDoc(
      doc(db, "admin", userData?.email),
      {
        avatar: avatar,
      },
      { merge: true }
    )
      .then(() => {
        toast.success("Profile Picture Changed");
      })
      .catch((err) => toast.error(err.code));
  };
  const handleDeleteAvatar = async () => {
    await setDoc(
      doc(db, "admin", userData?.email),
      {
        avatar: "",
      },
      { merge: true }
    )
      .then(() => {
        toast.success("Profile Picture Deleted");
        setImgSrc("");
      })
      .catch((err) => toast.error(err.code));
  };
  const DeleteFile = () => {
    const desertRef = ref(storage, `profile_picture/${auth.currentUser.email}`);

    if (window.confirm("Are you sure you want to remove this picture?")) {
      deleteObject(desertRef)
        .then(() => {
          handleDeleteAvatar();
        })
        .catch((error) => {
          toast.error(error.code);
        });
    }
  };
  const UploadFile = () => {
    const storageRef = ref(
      storage,
      `profile_picture/${auth.currentUser.email}`
    );

    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress >= 100) {
          document.getElementById("progress").innerHTML = "Uploading Done";
          setAvatarChangeModal(false);
        } else {
          document.getElementById(
            "progress"
          ).innerHTML = `Uploading ${progress}%`;
        }
      },
      (error) => {
        toast.error(error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          handleStaffAvatar(downloadURL);
          setImgFile("");
          setImgSrc(URL.createObjectURL(imgFile));
        });
      }
    );
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (e.target.password.value !== e.target.confirmpassword.value) {
      toast.error("Password Mismatch!");
      return;
    }

    updatePassword(user, e.target.password.value)
      .then(() => {
        toast.success("Password Updated");
        handlepasswordChangeModalClose();
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };

  useEffect(() => {
    if (userData) {
      setImgSrc(userData?.avatar);
    }
  }, [userData]);
  return (
    <div className="container-lg">
      <div className="bg-light pb-2 px-3 pt-3 rounded">
        <h3>Account Information</h3>
      </div>
      <div className="mt-4 bg-light rounded p-3">
        <div className="row d-flex align-items-center">
          <div className="col-5 col-md-3 col-lg-2">
            <img
              className="rounded-circle border-dark w-100"
              src={imgSrc}
              alt="profilepic"
            />
          </div>
          <div className="col-7 col-md-9 col-lg-10">
            <button
              className="btn btn-outline-dark me-3"
              onClick={handleAvatarChangeModalShow}
            >
              Change
            </button>
            <button className="btn btn-secondary" onClick={DeleteFile}>
              Remove
            </button>
          </div>
        </div>
      </div>
      
      <Modal
        centered
        show={avatarChangeModal}
        onHide={handleAvatarChangeModalClose}
      >
        <Modal.Header closeButton>Change Profile Pic</Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-4">
              <input
                type="file"
                className="form-control"
                required
                accept="image/*"
                onChange={(e) => setImgFile(e.target.files[0])}
              />
              <p id="progress"></p>
            </div>
            <input
              type="button"
              onClick={UploadFile}
              className="btn btn-primary d-flex justify-self-end ms-auto me-1"
              value={"Change"}
            />
          </form>
        </Modal.Body>
      </Modal>
      
      <div className="mt-4 bg-light rounded p-3">
        <h4>Personal Information</h4>
        <div className="row">
          <div className="col-sm-6">
            <div className="table-responsive small">
              <table className="table table-borderless table-sm table-light">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{userData?.firstName} {userData?.lastName}</td>
                  </tr>
                  <tr>
                    <td>Department</td>
                    <td>{userData?.department}</td>
                  </tr>
                  <tr>
                    <td>Email Adress</td>
                    <td>{userData?.email}</td>
                  </tr>
                  <tr>
                    <td>Account No</td>
                    <td>{userData?.accountNo}</td>
                  </tr>
                  <tr>
                    <td>Date Joined</td>
                    <td>{userData?.dateJoined}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="table-responsive small">
              <table className="table table-borderless table-sm table-light">
                <tbody>
                  <tr>
                    <td>Employee Id</td>
                    <td>{userData?.id}</td>
                  </tr>
                  <tr>
                    <td>Designation</td>
                    <td>{userData?.designation}</td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>{userData?.role}</td>
                  </tr>
                  <tr>
                    <td>Basic Salary</td>
                    <td>#{userData?.basicSalary}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light rounded p-3 mt-4">
       <h4>Password</h4>
        <div className="mt-4">
          <button
            className="btn btn-success"
            onClick={handlePasswordChangeModalShow}
          >
            Change Password
          </button>
        </div>
      </div>
      <Modal
        centered
        show={passwordChangeModal}
        onHide={handlepasswordChangeModalClose}
      >
        <Modal.Header closeButton>Change Password</Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePasswordChange}>
            <div className="form-floating mb-2">
              <input
                type="password"
                className="form-control rounded-0 border-0 border-bottom"
                id="password"
                name="password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="password"
                className="form-control rounded-0 border-0 border-bottom"
                id="confirmpassword"
                name="confirmpassword"
                required
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>
            <button className="btn btn-primary mt-4 d-flex justify-self-end ms-auto me-1">
              Change
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
