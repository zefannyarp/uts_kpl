<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUptimeSummaryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('uptime_summary', function (Blueprint $table) {
            $table->bigIncrements('id');
//            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('uptime_report_id');
            $table->timestamps();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->integer('total_error');
            $table->integer('downtime');

//            $table->foreign('user_id')
//                ->references('id')
//                ->on('users')
//                ->onDelete('cascade');

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
        Schema::dropIfExists('uptime_summary');
    }
}
