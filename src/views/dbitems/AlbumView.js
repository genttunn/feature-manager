import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import requests from "../../utils/requests";
import AlbumForm from "../../components/forms/AlbumForm";
import { LoadingContext } from "../../shared/LoadingContext";

export default function AlbumView() {
  const [albums, setAlbums] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const [modalMode, setModalMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentAlbumEdited, setCurrentAlbumEdited] = useState(0);

  useEffect(() => {
    if (loading === true) {
      fetchAlbums();
    }
  }, [loading]);

  let fetchAlbums = async () => {
    let result = await requests.getAllAlbums();
    if (result && result.length > 0) {
      setAlbums(result);
      setLoading(false);
    }
  };
  let deleteAlbum = async (album) => {
    let response = await requests.deleteAlbum(album.id);
    if (response !== "OK") {
      alert(response);
    }
    setLoading(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (mode, album = null) => {
    if (mode === "EDIT") {
      setCurrentAlbumEdited(album);
    }
    setModalMode(mode);
    setShowModal(true);
  };
  return (
    <div>
      <Button
        variant="primary"
        className="mt-2 mb-4"
        onClick={() => handleShowModal("ADD")}
      >
        New Album
      </Button>
      <div style={styles.body}>
        {albums.length > 0 &&
          albums.map((album) => (
            <Card style={styles.card} key={album.id}>
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.description}</Card.Text>
                <Card.Text>{album.time_stamp}</Card.Text>
                <Button
                  variant="primary"
                  className="m-1"
                  onClick={() => handleShowModal("EDIT", album)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="m-1"
                  onClick={() => deleteAlbum(album)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
 
        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === "EDIT" ? "Edit album" : "Add new album"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AlbumForm
              handleCloseEdit={handleCloseModal}
              album={currentAlbumEdited}
              mode={modalMode}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

const styles = {
  body: {
    display: "grid",
    gridGap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    placeItems: "center",
  },
  card: {
    display: "grid",
    placeItems: "center",
    backgroundColor: "lightpink",
    height: "14rem",
    width: "14rem",
    borderRadius: 20,
  },
};
