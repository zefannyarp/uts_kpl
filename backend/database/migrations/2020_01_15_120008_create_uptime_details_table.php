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
            $table->unsignedBigInteger('uptime_report_id');
            $table->timestamps();
            $table->dateTime('date_time');
            $table->text('request_name');

            $table->foreign('uptime_report_id')
                ->references('id')
                ->on('uptime_report')
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
