const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateUserProvider1678381319435 {
    name = 'updateUserProvider1678381319435'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`provider\` \`provider\` enum ('jwt', 'google', 'github') NOT NULL DEFAULT 'jwt'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`provider\` \`provider\` enum ('jwt', 'google') NOT NULL DEFAULT ''jwt''`);
    }
}
