import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [passwordChangeShow, setPasswordChangeShow] = useState(false);
  const [passwordConfirmChangeShow, setPasswordConfirmChangeShow] =
    useState(false);
  const [passwordChangeModal, setPasswordChangeModal] = useState(false);
  const [avatarChangeModal, setAvatarChangeModal] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");

  const handlePasswordChangeShow = (e) => {
    e.preventDefault();
    setPasswordChangeShow(!passwordChangeShow);
  };
  const handlePasswordConfirmChangeShow = (e) => {
    e.preventDefault();
    setPasswordConfirmChangeShow(!passwordConfirmChangeShow);
  };

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

    if (window.confirm("Are you sure you want to delete this staff?")) {
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
    <div className="container-lg my-4">
      <h5>Account Information</h5>
      <hr></hr>
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
      <hr></hr>
      <div>
        <h5>Personal Information</h5>
        <div className="row">
          <div className="col-sm-6">
            <div className="table-responsive small">
              <table className="table table-borderless table-sm">
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
              <table className="table table-borderless table-sm">
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
                  <tr>
                    <td>Casual Leave</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>
      <h5>Password</h5>
      <div>
        <button
          className="btn btn-primary"
          onClick={handlePasswordChangeModalShow}
        >
          Change
        </button>
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
                type={passwordChangeShow ? "text" : "password"}
                className="form-control position-relative rounded-0 border-0 border-bottom"
                id="password"
                name="password"
                required
              />
              <label for="password">Password</label>
              <button
                className="btn position-absolute bottom-0 end-0"
                style={{ zIndex: "2" }}
                onClick={handlePasswordChangeShow}
              >
                {passwordChangeShow ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-floating mb-2">
              <input
                type={passwordConfirmChangeShow ? "text" : "password"}
                className="form-control position-relative rounded-0 border-0 border-bottom"
                id="confirmpassword"
                name="confirmpassword"
                required
              />
              <label for="confirmpassword">Confirm Password</label>
              <button
                className="btn position-absolute bottom-0 end-0"
                onClick={handlePasswordConfirmChangeShow}
              >
                {passwordConfirmChangeShow ? <FaEyeSlash /> : <FaEye />}
              </button>
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
