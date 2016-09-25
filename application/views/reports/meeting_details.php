<form layout-padding ng-submit="submit_report(meeting_details_form,data)" name="meeting_details_form">
    <div layout-padding>
        <div layout="column" layout-padding>
            <div layout="row">
                <label class="form-label"><span class="index">১</span>প্রতিষ্ঠান প্রধান শিখন-শেখানো বিষয়ে গুরুত্ব দিয়ে পূর্ণ শিক্ষক সভা আয়োজন করে কিনা?&nbsp; </label>
                <md-radio-group   ng-model="data.full_teacher_meeting" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout="row" layout-padding>
                <label><i class="fa fa-arrow-right"></i> &nbsp;সর্বশেষ সভার তারিখ</label>
                <md-datepicker ng-model="data.ftm_date" md-placeholder="Select a date"></md-datepicker>
            </div>
            <div layout="row" layout-padding>
                <label class="form-label"><i class="fa fa-arrow-right"></i> &nbsp;রেজিস্টার সংরক্ষণ করা হয় কিনা?&nbsp; </label>
                <md-radio-group   ng-model="data.ftm_register" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
        </div>
        <div layout="column" layout-padding>
            <div layout="row">
                <label class="form-label"><span class="index">২</span>বিষয় ভিত্তিক শিক্ষক সভা আয়োজন করে কিনা?( প্রতিটার্মে ১ বার )&nbsp; </label>
                <md-radio-group   ng-model="data.subjective_meeting" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout="row" layout-padding>
                <label><i class="fa fa-arrow-right"></i> &nbsp;সর্বশেষ সভার তারিখ</label>
                <md-datepicker ng-model="data.sm_date" md-placeholder="Select a date"></md-datepicker>
            </div>
            <div layout="row" layout-padding>
                <label class="form-label"><i class="fa fa-arrow-right"></i> &nbsp;রেজিস্টার সংরক্ষণ করা হয় কিনা?&nbsp; </label>
                <md-radio-group   ng-model="data.sm_register" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
        </div>
        <div layout="column" layout-padding>
            <div layout="row">
                <label class="form-label"><span class="index">৩</span>নিয়মিত এসএমসি সভা করেন কিনা?( দুইমাসে ১টি ) &nbsp; </label>
                <md-radio-group   ng-model="data.smc_meeting" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout="row" layout-padding>
                <label><i class="fa fa-arrow-right"></i> &nbsp;সর্বশেষ সভার তারিখ</label>
                <md-datepicker ng-model="data.smc_date" md-placeholder="Select a date"></md-datepicker>
            </div>
            <div layout="row" layout-padding>
                <label class="form-label"><i class="fa fa-arrow-right"></i> &nbsp;রেজিস্টার সংরক্ষণ করা হয় কিনা?&nbsp; </label>
                <md-radio-group   ng-model="data.smc_register" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout-padding layout="row">
                <md-input-container class="md-block" flex>
                <label>মন্তব্য ( এসএমসি সংক্রান্ত কোন সমস্যা থাকলে মন্তব্যে উল্লেখ করুন )</label>
                    <textarea name="" rows="1" md-maxlength="200" ng-model="data.smc_comments" ></textarea>
                </md-input-container>
            </div>
        </div>
        <div layout="column" layout-padding>
            <div layout="row">
                <label class="form-label"><span class="index">৪</span>নিয়মিত পিটিএ/অভিভাবক সভা করেন কিনা?( প্রতিটার্মে ১ বার ) &nbsp; </label>
                <md-radio-group   ng-model="data.pta_meeting" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout="row" layout-padding>
                <label><i class="fa fa-arrow-right"></i> &nbsp;সর্বশেষ সভার তারিখ</label>
                <md-datepicker ng-model="data.pta_date" md-placeholder="Select a date"></md-datepicker>
            </div>
            <div layout="row" layout-padding>
                <label class="form-label"><i class="fa fa-arrow-right"></i> &nbsp;রেজিস্টার সংরক্ষণ করা হয় কিনা?&nbsp; </label>
                <md-radio-group   ng-model="data.pta_register" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
        </div>
            <div layout="row" layout-align="center">
               <input type="submit" name="" value="Submit" class="md-button md-primary md-raised">
            </div>
        <md-progress-circular ng-if="submitting_report" ng-disabled="!submitting_report" class="md-hue-2 pull-right" md-diameter="20px"></md-progress-circular>
    </div>
</form>
    