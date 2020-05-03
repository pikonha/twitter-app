import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddTwitterOwnerRelation1588460739276
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'tweets',
      new TableForeignKey({
        name: 'TweetOwner',
        columnNames: ['ownerId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('tweets', 'TweetOwner');
  }
}
