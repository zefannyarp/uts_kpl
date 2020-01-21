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
            $table->unsignedBigInteger('summary_id');
            $table->dateTime('date_time')->unique();
            $table->text('request');
//            $table->integer('downtime');

            $table->foreign('summary_id')
                ->references('id')
                ->on('uptime_summary');
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
