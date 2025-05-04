import React from "react";
import "./ExerciseModal.css";

const ExerciseModal = ({ exercise, onClose }) => {
  if (!exercise) return null;

  const convertToEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Si es un short de YouTube
      const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
      if (shortsMatch && shortsMatch[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      }

      return null;
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>{exercise.name}</h2>
        <p><strong>Grupo muscular:</strong> {exercise.muscle_group}</p>
        <p><strong>Descripción:</strong> {exercise.description}</p>

        {exercise.video_url && convertToEmbedUrl(exercise.video_url) && (
          <div className="video-container">
            <iframe
              width="100%"
              height="300"
              src={convertToEmbedUrl(exercise.video_url)}
              title="Video del ejercicio"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseModal;
