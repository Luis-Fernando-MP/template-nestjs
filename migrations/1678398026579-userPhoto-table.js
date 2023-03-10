const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class userPhotoTable1678398026579 {
    name = 'userPhotoTable1678398026579'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`photo\` text NULL DEFAULT 'https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`photo\``);
    }
}
