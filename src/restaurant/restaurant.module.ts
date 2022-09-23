import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './controller/restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [RestaurantService],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
