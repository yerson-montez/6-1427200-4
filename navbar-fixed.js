document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initializeMobileMenu();
    initializeSearchModal();
});

// ============================================
// MENÚ MÓVIL
// ============================================
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!mobileMenuButton || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Abrir menú móvil
    function openMobileMenu() {
        mobileMenu.classList.remove('-translate-x-full');
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Cambiar ícono a X
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }

    // Cerrar menú móvil
    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Cambiar ícono a hamburguesa
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Event listeners para el menú
    mobileMenuButton.addEventListener('click', openMobileMenu);
    
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('-translate-x-full')) {
            closeMobileMenu();
        }
    });
}

// ============================================
// MODAL DE BÚSQUEDA
// ============================================
function initializeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('search-button');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const closeSearch = document.getElementById('close-search');
    const searchInput = searchModal?.querySelector('.search-input');

    if (!searchModal) {
        console.warn('Search modal not found');
        return;
    }

    // Abrir modal de búsqueda
    function openSearchModal() {
        searchModal.classList.remove('hidden');
        searchModal.classList.add('animate-fade-in');
        document.body.style.overflow = 'hidden';
        
        // Hacer focus en el input después de un pequeño delay
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 100);
    }

    // Cerrar modal de búsqueda
    function closeSearchModal() {
        searchModal.classList.add('hidden');
        searchModal.classList.remove('animate-fade-in');
        document.body.style.overflow = '';
        
        // Limpiar el input al cerrar
        if (searchInput) searchInput.value = '';
    }

    // Event listeners para búsqueda
    if (searchButton) {
        searchButton.addEventListener('click', openSearchModal);
    }
    
    if (mobileSearchButton) {
        mobileSearchButton.addEventListener('click', openSearchModal);
    }
    
    if (closeSearch) {
        closeSearch.addEventListener('click', closeSearchModal);
    }

    // Cerrar al hacer click en el overlay (fondo oscuro)
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
            closeSearchModal();
        }
    });

    // Funcionalidad de las sugerencias de búsqueda (opcional)
    const searchSuggestions = searchModal.querySelectorAll('.px-4.py-2.bg-blue-50, .px-4.py-2.bg-teal-50, .px-4.py-2.bg-purple-50, .px-4.py-2.bg-orange-50');
    
    searchSuggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = this.textContent.trim();
                searchInput.focus();
            }
        });
    });

    // Manejar el submit del buscador (Enter)
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // Aquí puedes agregar la lógica de búsqueda
                    console.log('Buscando:', searchTerm);
                    // Por ejemplo, redirigir a una página de resultados:
                    // window.location.href = `/buscar?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
}

// ============================================
// ESTILOS DINÁMICOS
// ============================================
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        .-translate-x-full {
            transform: translateX(-100%);
        }
        
        #mobile-menu {
            transition: transform 0.3s ease-in-out;
        }
        
        #menu-overlay {
            background-color: rgba(0, 0, 0, 0.5);
            transition: opacity 0.3s ease-in-out;
        }
        
        .hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Agregar estilos al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDynamicStyles);
} else {
    addDynamicStyles();
}