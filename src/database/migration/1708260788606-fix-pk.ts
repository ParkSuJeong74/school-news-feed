import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPk1708260788606 implements MigrationInterface {
  name = 'FixPk1708260788606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" DROP CONSTRAINT "FK_f5d0d5358f05c6d17cbcfbc8bb8"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "student_id_seq" OWNED BY "student"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "id" SET DEFAULT nextval('"student_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" DROP CONSTRAINT "FK_201b59940cab3cb04350a8c1950"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "school_admin_id_seq" OWNED BY "school_admin"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_admin" ALTER COLUMN "id" SET DEFAULT nextval('"school_admin_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" DROP CONSTRAINT "FK_d805207966094079bd9fd528180"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_bb7390f6957bd07a5146b021cb3"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "school_id_seq" OWNED BY "school"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "id" SET DEFAULT nextval('"school_id_seq"')`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "news_id_seq" OWNED BY "news"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "id" SET DEFAULT nextval('"news_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" ADD CONSTRAINT "FK_201b59940cab3cb04350a8c1950" FOREIGN KEY ("school_admin_id") REFERENCES "school_admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" ADD CONSTRAINT "FK_d805207966094079bd9fd528180" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" ADD CONSTRAINT "FK_f5d0d5358f05c6d17cbcfbc8bb8" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_bb7390f6957bd07a5146b021cb3" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "news" DROP CONSTRAINT "FK_bb7390f6957bd07a5146b021cb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" DROP CONSTRAINT "FK_f5d0d5358f05c6d17cbcfbc8bb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" DROP CONSTRAINT "FK_d805207966094079bd9fd528180"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school" DROP CONSTRAINT "FK_201b59940cab3cb04350a8c1950"`,
    );
    await queryRunner.query(
      `ALTER TABLE "news" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "news_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "school_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "news" ADD CONSTRAINT "FK_bb7390f6957bd07a5146b021cb3" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" ADD CONSTRAINT "FK_d805207966094079bd9fd528180" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_admin" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "school_admin_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "school" ADD CONSTRAINT "FK_201b59940cab3cb04350a8c1950" FOREIGN KEY ("school_admin_id") REFERENCES "school_admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "student_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "subscribe_school_student" ADD CONSTRAINT "FK_f5d0d5358f05c6d17cbcfbc8bb8" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
