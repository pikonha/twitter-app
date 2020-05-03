import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTweetComments1588398257301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'tweet_comments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'ownerId',
            type: 'uuid',
          },
          {
            name: 'tweetId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tweet_comments',
      new TableForeignKey({
        name: 'CommentOwner',
        columnNames: ['ownerId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tweet_comments',
      new TableForeignKey({
        name: 'TweetComment',
        columnNames: ['tweetId'],
        referencedTableName: 'tweets',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('tweet_likes', 'CommentOwner');
    await queryRunner.dropForeignKey('tweet_likes', 'TweetComment');
    await queryRunner.dropTable('tweet_comments');
  }
}
