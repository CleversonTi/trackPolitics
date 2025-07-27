FROM php:8.2-fpm

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    zip unzip curl libpng-dev libonig-dev libxml2-dev \
    libzip-dev git default-mysql-client libpq-dev

# Instala extensões do PHP, incluindo PostgreSQL
RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring zip exif pcntl

# Copia o Composer do container oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www

# Copia os arquivos do projeto
COPY . .

# Instala as dependências PHP via Composer
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Porta e comando para rodar Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
