const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class userAuthTable1677913286021 {
    name = 'userAuthTable1677913286021'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`provider\` enum ('jwt', 'google') NOT NULL DEFAULT 'jwt'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`provider\``);
    }
}
