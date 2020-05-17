import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageToTweet1588728562235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'tweets',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('tweets', 'image');
  }
}
