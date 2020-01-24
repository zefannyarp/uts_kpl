<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUptimeReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('uptime_report', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->bigInteger('uptime_summary_id')->unsigned();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->integer('total_error');
            $table->integer('downtime');

            $table->foreign('uptime_summary_id')
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
        Schema::dropIfExists('uptime_report');
    }
}
