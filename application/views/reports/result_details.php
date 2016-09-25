<form layout-padding ng-submit="submit_report(result_details_form,data)" name="result_details_form">
    <div layout-padding>
        <label class="text-center"><span class="index"><i class="fa fa-file"></i></span>পরীক্ষার ফলাফল ( সর্বশেষ ফলাফল অনুযায়ী ) ১ম/২য় সাময়িক (সাল)</label>
        <div class="row">
            <div class="col-md-3">
                <label>৬ষ্ঠ শ্রেণী</label>
                <md-input-container class="md-block">
                    <label>অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_6_participants">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>কৃতকার্য শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_6_pass_students">
                </md-input-container>
            </div>
            <div class="col-md-3">
                <label>৭ম শ্রেণী</label>
                <md-input-container class="md-block">
                    <label>অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_7_participants">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>কৃতকার্য শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_7_pass_students">
                </md-input-container>
            </div>
            <div class="col-md-3">
                <label>৮ম শ্রেণী</label>
                <md-input-container class="md-block">
                    <label>অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_8_participants">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>কৃতকার্য শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_8_pass_students">
                </md-input-container>
            </div>
            <div class="col-md-3">
                <label>৯ম শ্রেণী</label>
                <md-input-container class="md-block">
                    <label>অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_9_participants">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>কৃতকার্য শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_9_pass_students">
                </md-input-container>
            </div>
            <div class="col-md-3">
                <label>১০ম শ্রেণী</label>
                <md-input-container class="md-block">
                    <label>অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_10_participants">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>কৃতকার্য শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.class_10_pass_students">
                </md-input-container>
            </div>
            <div class="col-md-3">
                <label>জে.এস.সি./জে.ডি.সি.</label>
                <md-input-container class="md-block">
                    <label>অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.jsc_participants">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>কৃতকার্য শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.jsc_pass_students">
                </md-input-container>
            </div>
            <div class="col-md-3">
                <label>এস.এস.সি./দাখিল</label>
                <md-input-container class="md-block">
                    <label>অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.ssc_participants">
                </md-input-container>

                <md-input-container class="md-block">
                    <label>কৃতকার্য শিক্ষার্থীর সংখ্যা</label>
                    <input type="text" name=""  value="" ng-model="data.ssc_pass_students">
                </md-input-container>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <md-input-container class="md-block">
                    <label>অকৃতকার্য শিক্ষার্থীর মানোন্নয়নে গৃহীত পদক্ষেপ</label>
                    <textarea name="" ng-model="data.steps_for_failiours" md-maxlength="200" rows="1"></textarea>
                </md-input-container>
            </div>
            <div class="col-md-6">
                <md-input-container class="md-block">
                    <label>পরিক্ষার ফলাফল উন্নয়নে পরিদর্শনকারী কর্মকর্তার সুপারিশ</label>
                    <textarea name="" ng-model="data.visitors_dev_recommendation"  md-maxlength="200" rows="1"></textarea>
                </md-input-container>
            </div>
        </div>
            <div layout="row" layout-align="center">
               <input type="submit" name="" value="Submit" class="md-button md-primary md-raised">
            </div>
            <md-progress-circular ng-if="submitting_report" ng-disabled="!submitting_report" class="md-hue-2 pull-right" md-diameter="20px"></md-progress-circular>
    </div>
</form>