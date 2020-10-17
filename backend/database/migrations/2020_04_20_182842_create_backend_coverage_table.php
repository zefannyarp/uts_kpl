<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBackendCoverageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('backend_coverage', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->dateTime('test_finished');
            $table->string('total_coverage');
            $table->string('loc');
            $table->string('ncloc');
            $table->string('classes');
            $table->string('method');
            $table->string('statements');
            $table->integer('namespace');
            $table->integer('ignored_namespace');
            $table->integer('target_namespace');
            $table->integer('target_below_90%');
            $table->string('target_coverage');
            $table->integer('target_below_95%');
            $table->string('target_coverage_95%+');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('backend_coverage');
    }
}
