
      function preventZoom() {
          document.body.style.zoom = '100%'; // Set the desired zoom level
      }

      window.addEventListener('resize', preventZoom);
      window.addEventListener('load', preventZoom);
