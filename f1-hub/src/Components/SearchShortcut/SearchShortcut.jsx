import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Press "/" anywhere (when you are not typing) to jump to the search
function SearchShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(event) {
      const tag = event.target.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (event.key !== '/' || isTyping) {
        return;
      }

      event.preventDefault();

      const input = document.getElementById('search-input');

      if (input) {
        input.focus();
      } else {
        navigate('/search');
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default SearchShortcut;