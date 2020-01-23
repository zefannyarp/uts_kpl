<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUptimeDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('uptime_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('summary_id')->unsigned();
            $table->timestamps();
            $table->dateTime('date_time');
            $table->text('request');

            $table->foreign('summary_id')
                ->references('id')
                ->on('uptime_summary')
                ->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('uptime_details');
    }
}
