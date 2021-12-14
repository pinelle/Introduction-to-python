
        // add-on: list(s: string): string[]
        function list(s) {
            // if s is a string, we return a list of its characters
            if (typeof s === 'string')
                return s.split('');
            else
                // otherwise we return s:
                return s;
        }

        import {visual as vizual} from 'psychopy';
import {core as cre} from 'psychopy';
import {gui} from 'psychopy';
import {event} from 'psychopy';
import {Button} from 'button';
import {Selector} from 'selector';
import * as os from 'os';
import * as csv from 'csv';
var _pj;
var Instruct1_text, Instruct2_text, Instruct3_text, Instruct4_text;
function _pj_snippets(container) {
    function set_properties(cls, props) {
        var desc, value;
        var _pj_a = props;
        for (var p in _pj_a) {
            if (_pj_a.hasOwnProperty(p)) {
                value = props[p];
                if (((((! ((value instanceof Map) || (value instanceof WeakMap))) && (value instanceof Object)) && ("get" in value)) && (value.get instanceof Function))) {
                    desc = value;
                } else {
                    desc = {"value": value, "enumerable": false, "configurable": true, "writable": true};
                }
                Object.defineProperty(cls.prototype, p, desc);
            }
        }
    }
    container["set_properties"] = set_properties;
    return container;
}
_pj = {};
_pj_snippets(_pj);
Instruct1_text = "Welcome to the Water Jug Problem Program!\n\nIn the problems, you will be shown three jugs with a distinct maximum volume of water, as well as a certain initial volume of water. In addition, each jug has a goal volume of water that you are attempting to achieve. To do this, you can transfer water from one jug to another by clicking. As much water as can fit in the second jug will be transferred. Using only the measurements of the maximum capacities of each jug, you will move from the initial volumes present to the goal volumes.\n\nIn the problem below, you start with 3 units of water in the first jug. Your goal is to end up with two units in the second jug, and one in the third. The current amounts are written on the top line, the goal amounts are written on the middle line, and the maximum amounts that each jug can hold are written on the bottom line.\n\nPlease feel free to ask any questions that you have at this point.";
Instruct2_text = "You can transfer water by first clicking on the jug you want to transfer from, followed by clicking on the jug you want to transfer to. The objective is to get the specified goal amount of water in each jug by pouring from one jug to another. The following rules are observed:\n\n1. There is no measure of the amount of water except that the initial amounts and the capacities of each are known.\n2. No outside water may be added or subtracted.\n3. You may pour back and forth as you wish.\n\nThere will be 32 problems of varying difficulty. Some problems will not be solvable at all. You will be given a maximum of 1.5 minutes for each problem if needed. If at any point you feel you cannot complete the current problem, you are able to click the 'I Give Up!' button to move on to the next problem in the series.\n\nPlease feel free to ask any questions that you have at this point.";
Instruct3_text = "At the beginning of the experiment, you will be given 2 example problems to allow you to familiarize yourself with the program. You will then be asked to attempt 32 Water Jug Problems.\n\nBefore beginning each problem, you will be asked to state your feeling of how solvable a problem is by selecting a number between 0 and 10. These correspond to a rating of:\n\n0: I am completely sure that the problem is NOT solvable.\n10: I am completely sure that the problem IS solvable.\n\nWe would like you to make these judgments quickly. After a short time, the screen will turn red. This is your signal to input your judgment immediately.\n\nPlease feel free to ask any questions at this point.";
Instruct4_text = "In order to make this rating, at the beginning of each new problem:\n\n1. Decide how solvable you believe the problem is.\n2. Click on a number between 0 and 10 corresponding to your Judgment of Solvability.\n3. Begin solving the problem.\n\nIn addition to making this rating at the beginning of each new problem, you will also be asked to make this Judgment again every 15 seconds during the problem.\n\nAgain, we would like you to make these judgments quickly. After a short time, the screen will turn red. This is your signal to input your judgment immediately.\n\nPlease feel free to ask any questions that you have at this point.\n\nIf you are ready to begin solving, please press the spacebar now.";
class Bucket extends object {
    constructor(window, capacity, pos = [0, 0]) {
        this.window = window;
        this.capacity = capacity;
        this.contents = 0;
        this.pos = pos;
        this.selected = false;
        this.goal_string = "N/A";
        this.water = new vizual.Rect(this.window, {"pos": this.pos, "width": this.BUCKET_WIDTH, "height": (this.contents * this.HEIGHT_SCALING_FACTOR), "fillColor": "blue", "lineColor": "blue"});
        this.leftBorder = new vizual.Line(this.window, {"start": [(this.pos[0] - (this.BUCKET_WIDTH / 2.0)), this.pos[1]], "end": [(this.pos[0] - (this.BUCKET_WIDTH / 2.0)), (this.pos[1] + (this.capacity * this.HEIGHT_SCALING_FACTOR))], "lineColor": "black", "lineWidth": this.BORDER_WIDTH});
        this.rightBorder = new vizual.Line(this.window, {"start": [(this.pos[0] + (this.BUCKET_WIDTH / 2.0)), this.pos[1]], "end": [(this.pos[0] + (this.BUCKET_WIDTH / 2.0)), (this.pos[1] + (this.capacity * this.HEIGHT_SCALING_FACTOR))], "lineColor": "black", "lineWidth": this.BORDER_WIDTH});
        this.bottomBorder = new vizual.Line(this.window, {"start": [(this.pos[0] - (this.BUCKET_WIDTH / 2.0)), this.pos[1]], "end": [(this.pos[0] + (this.BUCKET_WIDTH / 2.0)), this.pos[1]], "lineColor": "black", "lineWidth": this.BORDER_WIDTH});
        this.selectionChecker = new vizual.Rect(this.window, {"pos": [this.pos[0], (this.pos[1] + ((this.capacity / 2.0) * this.HEIGHT_SCALING_FACTOR))], "width": (this.BUCKET_WIDTH + this.SELECTION_PADDING), "height": ((this.capacity * this.HEIGHT_SCALING_FACTOR) + this.SELECTION_PADDING), "fillColor": "DimGray", "lineColor": "DimGray"});
        this.contents_label = new vizual.TextStim(this.window, {"pos": [this.pos[0], (this.pos[1] - this.LABEL_SPACING)], "text": this.contents.toString(), "color": "Black"});
        this.goal_label = new vizual.TextStim(this.window, {"pos": [this.pos[0], (this.pos[1] - (this.LABEL_SPACING * 3))], "text": this.goal_string.toString(), "color": "Chartreuse"});
        this.capacity_label = new vizual.TextStim(this.window, {"pos": [this.pos[0], (this.pos[1] - (this.LABEL_SPACING * 5))], "text": this.capacity.toString(), "color": "Black"});
    }
    draw() {
        if (this.selected) {
            this.selectionChecker.draw();
        }
        this.water.draw();
        this.contents_label.draw();
        this.capacity_label.draw();
        this.goal_label.draw();
        this.leftBorder.draw();
        this.rightBorder.draw();
        this.bottomBorder.draw();
    }
    setContents(contents) {
        var water_center;
        this.contents = contents;
        water_center = [this.pos[0], (this.pos[1] + ((this.contents / 2.0) * this.HEIGHT_SCALING_FACTOR))];
        this.water.setPos(water_center);
        this.water.setHeight((this.contents * this.HEIGHT_SCALING_FACTOR));
        this.contents_label.setText(this.contents.toString());
    }
    setGoalString(goal_string) {
        this.goal_label.setText(goal_string);
    }
    contains(pos) {
        return this.selectionChecker.contains(pos);
    }
    setSelected(selected = true) {
        this.selected = selected;
    }
    pourInto(other_bucket) {
        var amount_can_move;
        if (((this.contents + other_bucket.contents) > other_bucket.capacity)) {
            amount_can_move = (other_bucket.capacity - other_bucket.contents);
            other_bucket.setContents(other_bucket.capacity);
            this.setContents((this.contents - amount_can_move));
        } else {
            if ((this !== other_bucket)) {
                other_bucket.setContents((other_bucket.contents + this.contents));
                this.setContents(0);
            }
        }
    }
}
_pj.set_properties(Bucket, {"BORDER_WIDTH": 4, "BUCKET_WIDTH": 5, "HEIGHT_SCALING_FACTOR": 0.9, "LABEL_SPACING": 1, "SELECTION_PADDING": 0.8});
class BucketExperiment extends object {
    constructor(trials_filename) {
        var dlg, info_dict, test_trials, this_trials;
        info_dict = {"participant number": "0", "age": "", "gender": ""};
        dlg = new gui.DlgFromDict({"dictionary": info_dict, "title": "Participant Number"});
        if (dlg.OK) {
            this.participant_number = info_dict["participant number"];
            this.age = info_dict["age"];
            this.gender = info_dict["gender"];
        } else {
            this.participant_number = null;
        }
        this.window = new vizual.Window({"fullscr": true, "units": "deg", "monitor": "testMonitor", "gammaErrorPolicy": "ignore"});
        this.mouse = new psychoJS.eventManager.Mouse({"visible": true, "win": this.window});
        this.water_movement_clock = new cre.Clock();
        this.global_trial_clock = new cre.Clock();
        this_trials = [];
        test_trials = this_trials.slice(2);
        util.shuffle(test_trials);
        this.left_bucket = new Bucket(this.window, 11, {"pos": [(- 10), 2]});
        this.center_bucket = new Bucket(this.window, 7, {"pos": [0, 2]});
        this.right_bucket = new Bucket(this.window, 3, {"pos": [10, 2]});
        this.buckets = [this.left_bucket, this.center_bucket, this.right_bucket];
        this.selected_bucket = null;
        this.contents_text_label = new vizual.TextStim(this.window, {"pos": [(- 17), 1], "text": "Contents:", "color": "Black"});
        this.goal_text_label = new vizual.TextStim(this.window, {"pos": [(- 17.9), (- 0.95)], "text": "Goal:", "color": "Chartreuse"});
        this.capacity_text_label = new vizual.TextStim(this.window, {"pos": [(- 17.05), (- 3)], "text": "Capacity:", "color": "Black"});
        this.quit_button = new Button(this.window, {"pos": [0, (- 12)], "width": 8, "height": 2.5, "text": "I Give Up!"});
        this.screen_faded = false;
        this.question_border = new vizual.Rect(this.window, {"pos": [0, (- 55)], "width": 100, "height": 100, "fillColor": "DarkGrey", "lineColor": "Black"});
        this.question_label = new vizual.TextStim(this.window, {"pos": [0, (- 7)], "text": "Please input your judgment of solvability now.", "wrapWidth": 500});
        this.anchor_label = new vizual.TextStim(this.window, {"pos": [0, (- 13.5)], "text": "0: I am completely sure that the problem is NOT solvable.\n10: I am completely sure that the problem IS solvable.", "wrapWidth": 50});
        this.selector = new Selector(this.window, {"pos": [0, (- 9.75)], "choices": range(0, 11), "button_width": 1.5, "button_height": 1.5, "button_spacing": 0.6});
    }
    drawScreen() {
        this.left_bucket.draw();
        this.center_bucket.draw();
        this.right_bucket.draw();
        this.contents_text_label.draw();
        this.capacity_text_label.draw();
        this.goal_text_label.draw();
        if (this.screen_faded) {
            this.question_border.draw();
            this.question_label.draw();
            this.selector.draw();
            this.anchor_label.draw();
        } else {
            this.quit_button.draw();
        }
        this.window.flip();
    }
    run() {
        var capacities, goal_state, problem_number, starting_contents;
        if ((this.participant_number === null)) {
            return;
        }
        this.instruct1 = new vizual.TextStim(this.window, {"pos": [0, 6], "text": Instruct1_text, "color": "Black", "wrapWidth": 50});
        this.instruct1_image = new vizual.ImageStim(this.window, "Instruct1.JPG", {"color": [1, 1, 1], "size": [30, 9.7], "pos": [0, (- 7)]});
        this.instruct2 = new vizual.TextStim(this.window, {"pos": [0, 6], "text": Instruct2_text, "color": "Black", "wrapWidth": 50});
        this.instruct2_image = new vizual.ImageStim(this.window, "Instruct2.JPG", {"color": [1, 1, 1], "size": [40, 5.8], "pos": [0, (- 7)]});
        this.instruct3 = new vizual.TextStim(this.window, {"pos": [0, 6], "text": Instruct3_text, "color": "Black", "wrapWidth": 50});
        this.instruct3_image = new vizual.ImageStim(this.window, "Instruct3.JPG", {"color": [1, 1, 1], "size": [25, 8.2], "pos": [0, (- 7)]});
        this.instruct4 = new vizual.TextStim(this.window, {"pos": [0, 6], "text": Instruct4_text, "color": "Black", "wrapWidth": 50});
        this.press_to_cont = new vizual.TextStim(this.window, {"pos": [0, (- 13.5)], "text": "<<Press any key to continue.>>", "wrapWidth": 50, "color": "Black"});
        this.instruct1.draw();
        this.instruct1_image.draw();
        this.press_to_cont.draw();
        this.window.flip();
        psychoJS.eventManager.waitKeys();
        this.instruct2.draw();
        this.instruct2_image.draw();
        this.press_to_cont.draw();
        this.window.flip();
        psychoJS.eventManager.waitKeys();
        this.instruct3.draw();
        this.instruct3_image.draw();
        this.press_to_cont.draw();
        this.window.flip();
        psychoJS.eventManager.waitKeys();
        this.instruct4.draw();
        this.press_to_cont.draw();
        this.window.flip();
        psychoJS.eventManager.waitKeys();
        this.window.flip();
        cre.wait(0.5);
        this.trial_count = 0;
        for (var trial, _pj_c = 0, _pj_a = this.trials, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            trial = _pj_a[_pj_c];
            [starting_contents, goal_state, problem_number, capacities] = trial;
            this.left_bucket = new Bucket(this.window, capacities[0], {"pos": [(- 10), 2]});
            this.center_bucket = new Bucket(this.window, capacities[1], {"pos": [0, 2]});
            this.right_bucket = new Bucket(this.window, capacities[2], {"pos": [10, 2]});
            this.buckets = [this.left_bucket, this.center_bucket, this.right_bucket];
            this.runTrial(starting_contents, goal_state, problem_number, capacities);
            this.trial_count += 1;
            if ((this.trial_count === 2)) {
                this.practice_end_message = new vizual.TextStim(this.window, {"pos": [0, 3], "text": "This is the end of the practice trial.\n\nIf you have any questions, please ask the researcher now.".toString(), "wrapWidth": 50, "color": "Black"});
                this.press_to_end_prac = new vizual.TextStim(this.window, {"pos": [0, (- 13.5)], "text": "<<If you are ready to begin solving, press any key to continue>>", "wrapWidth": 50, "color": "Black"});
                this.practice_end_message.draw();
                this.press_to_end_prac.draw();
                this.window.flip();
                psychoJS.eventManager.waitKeys();
            }
            if ((! (this.trial_count === this.trials.length))) {
                this.window.flip();
                cre.wait(0.5);
                this.transition_message = new vizual.TextStim(this.window, {"pos": [0, 0], "text": "Moving to next problem".toString(), "color": "Black"});
                this.transition_message.draw();
                this.window.flip();
                cre.wait(1.0);
                this.window.flip();
                cre.wait(0.5);
            } else {
                this.window.flip();
                cre.wait(1);
            }
        }
        this.pressure = new vizual.RatingScale({"win": this.window, "name": "rating", "marker": "triangle", "size": 1.0, "pos": [0, 0], "low": 0, "high": 100, "markerStart": null, "labels": ["0%", "100%"], "scale": "Please rate how hurried you felt by the time limit on the problems, in general", "tickHeight": "-0.0", "singleClick": false});
        while (this.pressure.noResponse) {
            this.pressure.draw();
            this.window.flip();
        }
        this.pressure_rating = this.pressure.getRating();
        this.completion_message = new vizual.TextStim(this.window, {"pos": [0, 0], "text": "Thank you! The experiment is now complete.\n\nPlease notify the researcher now.".toString(), "wrapWidth": 30, "alignHoriz": "center", "color": "Black"});
        this.completion_message.draw();
        this.window.flip();
        psychoJS.eventManager.waitKeys();
    }
    runTrial(starting_contents, goal_state, problem_number, capacities) {
        var trial_done, water_movement_counter;
        if ((this.selected_bucket !== null)) {
            this.selected_bucket.setSelected(false);
            this.selected_bucket = null;
        }
        this.left_bucket.setContents(starting_contents[0]);
        this.left_bucket.setGoalString(goal_state[0].toString());
        this.center_bucket.setContents(starting_contents[1]);
        this.center_bucket.setGoalString(goal_state[1].toString());
        this.right_bucket.setContents(starting_contents[2]);
        this.right_bucket.setGoalString(goal_state[2].toString());
        water_movement_counter = 0;
        trial_done = false;
        this.global_trial_clock.reset();
        while ((! trial_done)) {
            water_movement_counter += 1;
            this.runJudgmentTask(problem_number);
            trial_done = (this.runMoveWaterSection(goal_state, problem_number) || (water_movement_counter === this.WATER_MOVEMENT_CYCLES));
        }
        this.runJudgmentTask(problem_number, {"resetScreen": false});
        this.drawScreen();
    }
    runJudgmentTask(problem_number, resetScreen = true) {
        var judgment_displayed_time, judgment_made, judgment_submitted_time;
        this.screen_faded = true;
        judgment_displayed_time = this.global_trial_clock.getTime();
        this.water_movement_clock.reset();
        this.question_border.setFillColor("DimGrey");
        while ((! this.selector.selectionMade())) {
            if ((this.water_movement_clock.getTime() >= 4)) {
                this.question_border.setFillColor("Red");
            }
            this.drawScreen();
        }
        judgment_made = this.selector.selection;
        judgment_submitted_time = this.global_trial_clock.getTime();
        this.selector.reset();
        if (resetScreen) {
            this.screen_faded = false;
            this.drawScreen();
        }
    }
    runMoveWaterSection(goal_state, problem_number) {
        var amount_moved, current_button_state, i, pos, previous_button_state, starting_contents;
        previous_button_state = false;
        this.water_movement_clock.reset();
        while (true) {
            if ((this.water_movement_clock.getTime() >= this.WATER_MOVEMENT_TIME)) {
                return false;
            }
            if (this.quit_button.clicked()) {
                this.quit_button.reset();
                return true;
            }
            current_button_state = this.mouse.getPressed()[0];
            psychoJS.eventManager.clearEvents();
            if ((current_button_state && (! previous_button_state))) {
                pos = this.mouse.getPos();
                i = 0;
                for (var bucket, _pj_c = 0, _pj_a = this.buckets, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
                    bucket = _pj_a[_pj_c];
                    if (bucket.contains(pos)) {
                        if ((this.selected_bucket === null)) {
                            bucket.setSelected();
                            this.selected_bucket = bucket;
                        } else {
                            starting_contents = bucket.contents;
                            this.selected_bucket.setSelected(false);
                            this.selected_bucket.pourInto(bucket);
                            this.selected_bucket = null;
                            amount_moved = (bucket.contents - starting_contents);
                            if ((list(map((b) => {
    return b.contents;
}, this.buckets)) === goal_state)) {
                                return true;
                            }
                        }
                    }
                }
                i = (i + 1);
            }
            this.drawScreen();
            previous_button_state = current_button_state;
        }
    }
}
_pj.set_properties(BucketExperiment, {"WATER_MOVEMENT_CYCLES": 6, "WATER_MOVEMENT_TIME": 15.0});
