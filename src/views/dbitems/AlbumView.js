import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import requests from "../../utils/requests";
import AlbumForm from "../../components/forms/AlbumForm";
import { LoadingContext } from "../../shared/LoadingContext";
import globalComponents from "../../styles/globalComponents";
import { DarkmodeContext } from "../../shared/DarkmodeContext";
import { themeDark, themeLight } from "../../styles/globalStyles";
export default function AlbumView() {
  const [albums, setAlbums] = useState([]);
  const [studies, setStudies] = useState([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const [modalMode, setModalMode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentAlbumEdited, setCurrentAlbumEdited] = useState(0);
  const { darkmode } = useContext(DarkmodeContext);
  const theme = darkmode === true ? themeDark : themeLight;

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
  let fetchStudiesByAlbum = async (album_id) => {
    let result = await requests.getStudyByAlbum(album_id);
    setStudies(result);
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
    } else if (mode === "STUDIES") {
      setCurrentAlbumEdited(album);
      fetchStudiesByAlbum(album.id);
    }
    setModalMode(mode);
    setShowModal(true);
  };
  const modalTitle = (modalMode) => {
    let title = "";
    if (modalMode === "EDIT") {
      title = "Edit this album";
    } else if (modalMode === "ADD") {
      title = "Add this album";
    } else if (modalMode === "STUDIES") {
      title = "Album's studies";
    }
    return title;
  };
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
      height: "15rem",
      width: "15rem",
      borderRadius: 20,
      overflow: "hidden",
    },
    boldText: {
      fontWeight: "bold",
      borderRadius: 18,
    },
  };
  return (
    <div>
      {globalComponents}
      <Button
        variant="nord-jade"
        style={styles.boldText}
        className="mt-2 mb-4"
        onClick={() => handleShowModal("ADD")}
      >
        New Album
      </Button>
      <div style={styles.body}>
        {albums.length > 0 &&
          albums.map((album) => (
            <Card style={{ ...styles.card, ...theme.box }} key={album.id}>
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>{album.description}</Card.Text>
                <Card.Text>{album.time_stamp}</Card.Text>

                <Button
                  variant="nord-pink"
                  style={styles.boldText}
                  className="m-1"
                  onClick={() => handleShowModal("EDIT", album)}
                >
                  Edit
                </Button>
                <Button
                  variant="nord-yellow"
                  style={styles.boldText}
                  className="m-1"
                  onClick={() => handleShowModal("STUDIES", album)}
                >
                  Studies
                </Button>
                <Button
                  variant="nord-orange"
                  style={styles.boldText}
                  className="m-1"
                  onClick={() => deleteAlbum(album)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}

        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton style={theme.inputField}>
            <Modal.Title>{modalTitle(modalMode)}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={theme.box}>
            <AlbumForm
              handleCloseEdit={handleCloseModal}
              album={currentAlbumEdited}
              mode={modalMode}
              studies={studies}
            />
          </Modal.Body>
          <Modal.Footer style={theme.inputField}>
            <Button
              variant="nord-orange"
              style={styles.boldText}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
