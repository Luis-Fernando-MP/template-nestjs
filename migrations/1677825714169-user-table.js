const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class userTable1677825714169 {
    name = 'userTable1677825714169'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`users\` (\`user_id\` varchar(255) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(150) NOT NULL, \`name\` varchar(100) NOT NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
