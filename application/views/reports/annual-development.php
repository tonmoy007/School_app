<form layout-padding ng-submit="submit_report(annual_development_form,data)" name="annual_development_form">
    <div layout-padding>
        
            <div layout="row" layout-padding>
                <label><span class="index">১</span>প্রতিষ্ঠানের উন্নয়নে পঞ্চবার্ষিক উন্নয়ন পরিকল্পনা প্রনয়ন করা হয়েছে কিনা?</label>
                <div flex>
                    
                </div>
                <md-radio-group   ng-model="data.fifth_annual_dev" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout="row" layout-padding>
                <label><span class="index">২</span>প্রতিষ্ঠানের উন্নয়নে বার্ষিক উন্নয়ন পরিকল্পনা প্রনয়ন করা হয়েছে কিনা?</label>
                <div flex>
                    
                </div>
                <md-radio-group   ng-model="data.annual_dev" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout="row" layout-padding>
                <label><span class="index">৩</span>পরিকল্পনা প্রনয়নে এসএমসি/গভর্নিং বডি/একাডেমিক কাউন্সিল, অভিভাবক, সংশ্লিষ্ট ক্লাস্টার অংশগ্রহন করেছে কিনা?</label>
                <div flex>
                    
                </div>
                <md-radio-group   ng-model="data.important_personals_attendent" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div> 
            <div layout="row" layout-padding>
                <label><span class="index">৪</span>প্রতিষ্ঠানের উন্নয়ন  পরিকল্পনায় লক্ষ্যমাত্রা বাস্তবায়নে সর্বশেষ এসএমসি সভা অথবা শিক্ষকসভায় আলোচনা হয়েছে কিনা?</label>
                <div flex>
                    
                </div>
                <md-radio-group   ng-model="data.smc_or_teacher_meeting" layout="row">
                    <md-radio-button  value="হ্যাঁ" class="md-primary">হ্যাঁ</md-radio-button>
                    <md-radio-button  value="না" class="md-primary"> না </md-radio-button>
                </md-radio-group>
            </div>
            <div layout="row" layout-align="center">
                <input type="submit" name="" value="Submit" class="md-button md-primary md-raised">
            </div>
            
            <md-progress-circular ng-if="submitting_report" ng-disabled="!submitting_report" class="md-hue-2 pull-right" md-diameter="20px"></md-progress-circular>      
        
    </div>
</form>