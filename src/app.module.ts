import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ProductModule } from './product/product.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [UserModule, ScheduleModule, ProductModule, PackageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
