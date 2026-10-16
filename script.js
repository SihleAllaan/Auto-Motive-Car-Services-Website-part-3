document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form').forEach((form) => {
        const isCartForm = form.classList.contains('cart-form');
        const isVehicleSearchForm = form.id === 'vehicleSearchForm';

        if (isCartForm) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const selectedVehicle = form.querySelector('input[name="vehicle"]:checked');
                if (!selectedVehicle) {
                    alert('Please select a vehicle before adding it to the cart.');
                    return;
                }

                try {
                    const cartItems = JSON.parse(localStorage.getItem('automotiveCart') || '[]');
                    const vehicleName = selectedVehicle.value;
                    if (!cartItems.includes(vehicleName)) {
                        cartItems.push(vehicleName);
                        localStorage.setItem('automotiveCart', JSON.stringify(cartItems));
                    }
                } catch (error) {
                    console.error('Could not save cart data:', error);
                }

                window.location.href = 'cart.html';
            });
            return;
        }

        if (isVehicleSearchForm) {
            return;
        }

        if (form.classList.contains('enquiry-form')) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                if (form.dataset.requireVehicle !== undefined
                    && !form.querySelector('input[name="cartVehicles"]:checked')) {
                    const status = form.querySelector('[data-form-status]') || document.createElement('p');
                    status.dataset.formStatus = '';
                    status.setAttribute('role', 'alert');
                    status.textContent = 'Select at least one vehicle before preparing the enquiry email.';
                    if (!status.parentElement) {
                        form.appendChild(status);
                    }
                    return;
                }

                const fields = Array.from(new FormData(form).entries());
                const body = fields.map(([name, value]) => `${name}: ${value}`).join('\n');
                const subject = form.dataset.emailSubject || document.title;
                const status = form.querySelector('[data-form-status]') || document.createElement('p');
                status.dataset.formStatus = '';
                status.setAttribute('role', 'status');
                status.textContent = 'Opening your email app. Review and send the message to complete your enquiry.';
                if (!status.parentElement) {
                    form.appendChild(status);
                }

                const mailto = `mailto:sales@automotivecarservices.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailto;
            });
        }
    });

    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            faqButtons.forEach((item) => {
                item.setAttribute('aria-expanded', 'false');
                item.parentElement.classList.remove('open');
            });

            if (!isOpen) {
                button.setAttribute('aria-expanded', 'true');
                button.parentElement.classList.add('open');
            }
        });
    });

    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImage = document.getElementById('modalImage');
        const closeButton = document.querySelector('.close-modal');

        document.querySelectorAll('#gallery img, img[alt*="Vehicle"], img[alt*="Toyota"], img[alt*="Volkswagen"], img[alt*="BMW"], img[alt*="Gallery Image"]').forEach((image) => {
            image.addEventListener('click', () => {
                modalImage.src = image.src;
                modalImage.alt = image.alt;
                modal.classList.add('visible');
                modal.setAttribute('aria-hidden', 'false');
            });
        });

        closeButton.addEventListener('click', () => {
            modal.classList.remove('visible');
            modal.setAttribute('aria-hidden', 'true');
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('visible');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    const cartVehicleList = document.getElementById('cartVehicleList');
    if (cartVehicleList) {
        try {
            const storedVehicles = JSON.parse(localStorage.getItem('automotiveCart') || '[]');
            cartVehicleList.innerHTML = '';

            if (storedVehicles.length === 0) {
                cartVehicleList.innerHTML = '<p class="cart-empty-message">No vehicles selected yet.</p>';
            } else {
                storedVehicles.forEach((vehicle) => {
                    const item = document.createElement('label');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'cartVehicles';
                    checkbox.value = vehicle;
                    checkbox.checked = true;
                    item.append(checkbox, document.createTextNode(` ${vehicle}`));
                    cartVehicleList.appendChild(item);
                });
            }
        } catch (error) {
            console.error('Could not load cart data:', error);
            cartVehicleList.innerHTML = '<p class="cart-empty-message">No vehicles selected yet.</p>';
        }
    }

    const vehicleSearchForm = document.getElementById('vehicleSearchForm');
    const vehicleTable = document.getElementById('vehicleComparisonTable');

    if (vehicleSearchForm && vehicleTable) {
        const defaultVehicleOrder = Array.from(
            vehicleTable.querySelectorAll('thead th[data-name]'),
            (header) => header.dataset.name
        );

        vehicleSearchForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const query = document.getElementById('searchVehicle').value.trim().toLowerCase();
            const selectedType = document.getElementById('vehicleType').value;
            const maxPrice = Number(document.getElementById('price').value || 0);
            const headerRow = vehicleTable.querySelector('thead tr');
            const headers = Array.from(headerRow.querySelectorAll('th[data-name]'));
            const rows = Array.from(vehicleTable.querySelectorAll('tbody tr'));
            const sortOrder = document.getElementById('sortVehicles')?.value || 'default';
            const resultStatus = document.getElementById('vehicleSearchStatus');
            let matchCount = 0;

            if (sortOrder === 'name') {
                headers.sort((first, second) => first.dataset.name.localeCompare(second.dataset.name));
            } else if (sortOrder === 'price-low') {
                headers.sort((first, second) => Number(first.dataset.price) - Number(second.dataset.price));
            } else if (sortOrder === 'price-high') {
                headers.sort((first, second) => Number(second.dataset.price) - Number(first.dataset.price));
            } else {
                headers.sort((first, second) => defaultVehicleOrder.indexOf(first.dataset.name) - defaultVehicleOrder.indexOf(second.dataset.name));
            }

            const originalHeaders = Array.from(headerRow.querySelectorAll('th[data-name]'));
            const originalCells = rows.map((row) => new Map(originalHeaders.map((header, index) => [header.dataset.name, row.cells[index + 1]])));
            headers.forEach((header) => headerRow.appendChild(header));
            rows.forEach((row, rowIndex) => {
                headers.forEach((header) => row.appendChild(originalCells[rowIndex].get(header.dataset.name)));
            });

            headers.forEach((header, vehicleIndex) => {
                const matches = (!query || header.dataset.name.toLowerCase().includes(query))
                    && (!selectedType || header.dataset.type === selectedType)
                    && (!maxPrice || Number(header.dataset.price) <= maxPrice);
                header.hidden = !matches;
                if (matches) {
                    matchCount += 1;
                }

                rows.forEach((row) => {
                    const cell = row.cells[vehicleIndex + 1];
                    if (cell) {
                        cell.hidden = !matches;
                    }
                });
            });

            if (resultStatus) {
                resultStatus.textContent = `${matchCount} vehicle${matchCount === 1 ? '' : 's'} match your search.`;
            }
        });
    }
});
