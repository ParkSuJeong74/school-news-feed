import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSchoolAdmin1708240902188 implements MigrationInterface {
  name = 'AddSchoolAdmin1708240902188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "school_admin" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_042aeaff9ad44d2ba67f2213ae9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "school_admin"`);
  }
}
