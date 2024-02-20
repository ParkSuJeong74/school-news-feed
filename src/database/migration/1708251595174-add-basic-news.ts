import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBasicNews1708251595174 implements MigrationInterface {
  name = 'AddBasicNews1708251595174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "student" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "school" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" integer NOT NULL, "name" character varying NOT NULL, "region" character varying NOT NULL, "school_admin_id" integer NOT NULL, CONSTRAINT "REL_201b59940cab3cb04350a8c195" UNIQUE ("school_admin_id"), CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscribe_school_student" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "school_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_fc3fa804212a4b5e8b87a183782" PRIMARY KEY ("school_id", "student_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "news" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" integer NOT NULL, "content" character varying NOT NULL, "school_id" integer NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "news"`);
    await queryRunner.query(`DROP TABLE "subscribe_school_student"`);
    await queryRunner.query(`DROP TABLE "school"`);
    await queryRunner.query(`DROP TABLE "student"`);
  }
}
