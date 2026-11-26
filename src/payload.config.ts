import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { CarCategories } from "./collections/CarCategories";
import { CarModels } from "./collections/CarModels";
import { Promotions } from "./collections/Promotions";
import { Branches } from "./collections/Branches";
import { SalesConsultants } from "./collections/SalesConsultants";
import { Articles } from "./collections/Articles";
import { Leads } from "./collections/Leads";
import { ServiceBookings } from "./collections/ServiceBookings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — อีซูซุศาลาเชียงใหม่ CMS",
    },
  },
  collections: [
    Users,
    CarCategories,
    CarModels,
    Promotions,
    Branches,
    SalesConsultants,
    Articles,
    Leads,
    ServiceBookings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./data/payload.db",
    },
    push: true,
  }),
  sharp,
});
