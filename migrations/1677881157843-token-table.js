const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class tokenTable1677881157843 {
    name = 'tokenTable1677881157843'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`users\` (\`user_id\` varchar(255) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(150) NOT NULL, \`name\` varchar(100) NOT NULL, \`createdAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`token_id\` varchar(255) NOT NULL, \`token\` text NOT NULL, \`fk_user\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6a8ca5961656d13c16c04079dd\` (\`token\`), UNIQUE INDEX \`REL_0bc5468291fd0a43627975da91\` (\`fk_user\`), PRIMARY KEY (\`token_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tokens\` ADD CONSTRAINT \`FK_0bc5468291fd0a43627975da914\` FOREIGN KEY (\`fk_user\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_0bc5468291fd0a43627975da914\``);
        await queryRunner.query(`DROP INDEX \`REL_0bc5468291fd0a43627975da91\` ON \`tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a8ca5961656d13c16c04079dd\` ON \`tokens\``);
        await queryRunner.query(`DROP TABLE \`tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
